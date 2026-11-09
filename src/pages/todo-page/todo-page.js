
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ControlPanel } from '../../components';
import { createTodo, deleteTodo, readTodo, updateTodo } from '../../api';
import styles from './todo-page.module.css';

export const TodoPage = () => {
	const [title, setTitle] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	const onTitleChange = ({ target }) => setTitle(target.value);

	const onRemove = () => {
		deleteTodo(id).then(() => navigate('/'));
	};

	const onSave = () => {
		if (!title.trim()) return;

		if (id === undefined) {
			createTodo({ title: title.trim(), completed: false }).then(() =>
				navigate('/'),
			);
		} else {
			updateTodo({ id, title: title.trim() }).then(() => navigate(-1));
		}
	};

	useEffect(() => {
		if (id === undefined) return;

		setIsLoading(true);

		readTodo(id)
			.then((loadedTodo) => {
				if (!loadedTodo || loadedTodo.id === undefined) {
					navigate('/404', { replace: true });
					return;
				}

				setTitle(loadedTodo.title || '');
			})
			.catch(() => navigate('/404', { replace: true }))
			.finally(() => setIsLoading(false));
	}, [id, navigate]);

	if (isLoading) {
		return <div>Загрузка задачи...</div>;
	}

	return (
		<>
			<ControlPanel>
				<Button onClick={() => navigate(-1)}>
					<b>&larr;</b>
				</Button>

				{id !== undefined && (
					<Button onClick={onRemove}>Удалить</Button>
				)}

				<Button onClick={onSave}>Сохранить</Button>
			</ControlPanel>

			<div>
				<textarea
					className={styles.title}
					value={title}
					onChange={onTitleChange}
					placeholder="Введите текст задачи..."
				/>
			</div>
		</>
	);
};
