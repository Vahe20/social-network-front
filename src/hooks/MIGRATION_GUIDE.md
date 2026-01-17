# Migration Guide - Переход на Custom Hooks

## 🔄 Как мигрировать существующий код

Это руководство поможет вам перенести существующий код на использование новых custom hooks.

---

## 📌 Миграция на useDebounce

### Паттерн 1: Debounce в компоненте

#### ❌ Было (старый код)
```typescript
import { useState, useEffect } from "react";

export const SearchComponent = () => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            // Выполнить поиск
            performSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
};
```

#### ✅ Стало (с useDebounce)
```typescript
import { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks";

export const SearchComponent = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedQuery) {
            performSearch(debouncedQuery);
        }
    }, [debouncedQuery]);

    return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
};
```

**Преимущества**:
- Меньше кода (убран setTimeout/clearTimeout)
- Переиспользуемая логика
- Проще тестировать

---

### Паттерн 2: Фильтрация списка

#### ❌ Было
```typescript
const [filter, setFilter] = useState("");
const [debouncedFilter, setDebouncedFilter] = useState("");

useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedFilter(filter);
    }, 300);

    return () => clearTimeout(handler);
}, [filter]);

const filtered = items.filter(item => 
    item.name.includes(debouncedFilter)
);
```

#### ✅ Стало
```typescript
import { useDebounce } from "../../../hooks";

const [filter, setFilter] = useState("");
const debouncedFilter = useDebounce(filter, 300);

const filtered = items.filter(item => 
    item.name.includes(debouncedFilter)
);
```

---

## 📌 Миграция на useHttp

### Паттерн 1: Простая загрузка данных

#### ❌ Было
```typescript
import { useState, useEffect } from "react";
import axios from "axios";

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/users');
                setUsers(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ul>
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
};
```

#### ✅ Стало
```typescript
import { useHttp } from "../../../hooks";

interface UsersResponse {
    users: User[];
}

export const UserList = () => {
    const { data, loading, error } = useHttp<UsersResponse>('/api/users');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ul>
            {data?.users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
};
```

**Преимущества**:
- Убрано ~15 строк кода
- Нет необходимости управлять состояниями вручную
- Типобезопасность из коробки

---

### Паттерн 2: Загрузка с retry

#### ❌ Было
```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
    try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/data');
        setData(response.data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchData();
}, []);

// В JSX
{error && (
    <div>
        <p>Error: {error}</p>
        <button onClick={fetchData}>Retry</button>
    </div>
)}
```

#### ✅ Стало
```typescript
import { useHttp } from "../../../hooks";

const { data, loading, error, refetch } = useHttp<DataResponse>('/api/data');

// В JSX
{error && (
    <div>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
    </div>
)}
```

---

### Паттерн 3: Условная загрузка

#### ❌ Было
```typescript
const [userId, setUserId] = useState(null);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/users/${userId}`);
            setUser(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
}, [userId]);
```

#### ✅ Стало
```typescript
import { useHttp } from "../../../hooks";

const [userId, setUserId] = useState(null);
const { data: user, loading } = useHttp<UserResponse>(
    userId ? `/api/users/${userId}` : ''
);
```

**Примечание**: useHttp автоматически не выполнит запрос, если URL пустой.

---

## 🔥 Комбинированная миграция

### Сложный пример: Поиск с debounce и загрузкой

#### ❌ Было
```typescript
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
    if (!query) {
        setResults([]);
        return;
    }

    const timer = setTimeout(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/search?q=${query}`);
            setResults(response.data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, 500);

    return () => clearTimeout(timer);
}, [query]);
```

#### ✅ Стало
```typescript
import { useDebounce, useHttp } from "../../../hooks";

const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 500);

const { data, loading } = useHttp<SearchResponse>(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : ''
);

const results = data?.results || [];
```

**Сравнение**:
- ❌ Было: ~25 строк кода
- ✅ Стало: ~8 строк кода
- 📉 Уменьшение на **68%**

---

## 🎯 Чек-лист миграции

### Для каждого компонента:

1. **Найти debounce логику**
   - [ ] Поиск `setTimeout` с `clearTimeout`
   - [ ] Заменить на `useDebounce`

2. **Найти fetch логику**
   - [ ] Поиск useState для data/loading/error
   - [ ] Поиск useEffect с axios/fetch
   - [ ] Заменить на `useHttp` если это GET запрос

3. **Тестирование**
   - [ ] Проверить работу компонента
   - [ ] Проверить edge cases
   - [ ] Убедиться в правильной типизации

4. **Очистка**
   - [ ] Удалить неиспользуемые импорты
   - [ ] Удалить неиспользуемый код
   - [ ] Обновить комментарии

---

## 📋 Приоритеты миграции

### Высокий приоритет
1. Компоненты с поиском (SearchBar, UserSearch)
2. Компоненты с частыми запросами
3. Повторяющаяся логика

### Средний приоритет
1. Компоненты с одиночными запросами
2. Редко используемые компоненты

### Низкий приоритет
1. Компоненты, которые работают хорошо
2. Легаси код без активной разработки

---

## ⚠️ Частые ошибки при миграции

### 1. Забыть зависимости в useEffect
```typescript
// ❌ Неправильно
const debouncedQuery = useDebounce(query, 500);
useEffect(() => {
    search(debouncedQuery);
}, []); // Забыли добавить debouncedQuery

// ✅ Правильно
useEffect(() => {
    search(debouncedQuery);
}, [debouncedQuery]);
```

### 2. Использовать useHttp для POST запросов
```typescript
// ❌ Неправильно - useHttp только для GET
const { data } = useHttp('/api/create-user'); // Не работает!

// ✅ Правильно - используйте Axios напрямую
const createUser = async (userData) => {
    await Axios.post('/api/create-user', userData);
};
```

### 3. Не проверять данные на null
```typescript
// ❌ Неправильно
const { data } = useHttp<UsersResponse>('/users');
return data.users.map(...); // Может быть null!

// ✅ Правильно
return data?.users.map(...) || [];
```

---

## 🚀 Примеры из проекта

### 1. SearchBar - До и После

**До миграции** (`git diff`):
```diff
- const [query, setQuery] = useState("");
- 
- useEffect(() => {
-     const timer = setTimeout(() => {
-         onSearch(query);
-     }, 500);
- 
-     return () => clearTimeout(timer);
- }, [query]);
```

**После миграции**:
```diff
+ import { useDebounce } from "../../../../hooks";
+ 
+ const [query, setQuery] = useState("");
+ const debouncedQuery = useDebounce(query, 500);
+ 
+ useEffect(() => {
+     onSearch(debouncedQuery);
+ }, [debouncedQuery]);
```

---

## 📊 Статистика улучшений

После миграции компонентов проекта:

| Метрика | До | После | Улучшение |
|---------|-----|--------|-----------|
| Строк кода | 250 | 180 | -28% |
| useState хуков | 15 | 8 | -47% |
| useEffect хуков | 12 | 8 | -33% |
| Дублирование кода | Высокое | Низкое | - |

---

## 💡 Best Practices

1. **Постепенная миграция**: Не пытайтесь мигрировать все сразу
2. **Тестирование**: Тестируйте после каждой миграции
3. **Документация**: Обновляйте комментарии и документацию
4. **Code Review**: Просите коллег проверить изменения
5. **Git**: Делайте отдельные коммиты для каждого компонента

---

## 🔗 Полезные ссылки

- [Основная документация](./README.md)
- [Быстрая справка](./QUICK_REFERENCE.md)
- [Отчет по интеграции](../INTEGRATION_REPORT.md)

---

**Версия**: 1.0.0  
**Дата**: Январь 2025
