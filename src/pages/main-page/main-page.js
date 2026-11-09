import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ControlPanel } from '../../components';
import { Search, Sorting } from './components';
import { readTodos } from '../../api';
import styles from './main-page.module.css';

export const MainPage = () => {
    const [todos, setTodos] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

    useEffect(() => {
        readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) =>
            setTodos(loadedTodos),
        );
    }, [searchPhrase, isAlphabetSorting]);

    return (
        <>
            <ControlPanel>
                <Search onSearch={setSearchPhrase} />
                <Sorting onSorting={setIsAlphabetSorting} />
                <Button>
                    <Link to="/task">✚</Link>
                </Button>
            </ControlPanel>

            <div>
                {todos.map(({ id, title }) => (
                    <div className={styles.todo} key={id}>
                        <Link to={`/task/${id}`} className={styles.title}>
                            {title}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};
