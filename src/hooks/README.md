# Custom Hooks Documentation

## Обзор

В проекте добавлены два custom hooks для оптимизации работы с API и улучшения пользовательского опыта.

## 📌 useDebounce

### Описание
Hook для отложенного обновления значения. Полезен для оптимизации запросов к API при вводе текста пользователем.

### Сигнатура
```typescript
useDebounce<T>(value: T, delay?: number): T
```

### Параметры
- `value: T` - значение, которое нужно debounce
- `delay: number` - задержка в миллисекундах (по умолчанию: 700ms)

### Возвращает
- `T` - debounced значение

### Пример использования

#### 1. Поиск пользователей с debounce

```typescript
import { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks";

export const SearchBar = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedQuery) {
            // Запрос к API выполнится только после 500ms бездействия
            searchUsers(debouncedQuery);
        }
    }, [debouncedQuery]);

    return (
        <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
        />
    );
};
```

#### 2. Фильтрация списка

```typescript
const [filter, setFilter] = useState("");
const debouncedFilter = useDebounce(filter, 300);

const filteredItems = useMemo(() => {
    return items.filter(item => 
        item.name.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
}, [debouncedFilter, items]);
```

### Преимущества
- ✅ Снижает количество API запросов
- ✅ Улучшает производительность
- ✅ Повышает отзывчивость UI
- ✅ Экономит трафик

---

## 📌 useHttp

### Описание
Hook для упрощения HTTP GET запросов с автоматической обработкой состояний загрузки и ошибок.

### Сигнатура
```typescript
useHttp<T>(url: string): {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}
```

### Параметры
- `url: string` - URL для GET запроса

### Возвращает объект с полями:
- `data: T | null` - данные ответа
- `loading: boolean` - индикатор загрузки
- `error: string | null` - сообщение об ошибке
- `refetch: () => Promise<void>` - функция для повторного запроса

### Пример использования

#### 1. Загрузка постов

```typescript
import { useHttp } from "../../../hooks";
import type { IPostsResponse } from "../../../types/utility";

export const PostsList = () => {
    const { data, loading, error, refetch } = useHttp<IPostsResponse>('/post');

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error} <button onClick={refetch}>Retry</button></div>;
    if (!data?.posts) return <div>No posts found</div>;

    return (
        <div>
            {data.posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};
```

#### 2. Загрузка профиля пользователя

```typescript
import { useHttp } from "../../../hooks";
import type { IUserResponse } from "../../../types/utility";

export const UserProfile = ({ userId }: { userId: number }) => {
    const { data, loading, error, refetch } = useHttp<IUserResponse>(
        `/account/${userId}`
    );

    if (loading) {
        return (
            <div className="profile-loading">
                <Spinner />
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-error">
                <p>Failed to load profile: {error}</p>
                <button onClick={refetch}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="profile">
            <h1>{data?.user.firstName} {data?.user.lastName}</h1>
            <p>@{data?.user.username}</p>
            {data?.user.bio && <p>{data.user.bio}</p>}
        </div>
    );
};
```

#### 3. Поиск с условной загрузкой

```typescript
export const SearchResults = ({ query }: { query: string }) => {
    // Hook автоматически выполнит запрос при монтировании
    const { data, loading, error } = useHttp<ISearchResponse>(
        `/account/search/${query}`
    );

    if (!query) return <p>Enter a search query</p>;
    if (loading) return <p>Searching...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3>Found {data?.users.length} users</h3>
            {data?.users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};
```

### Особенности
- ✅ Автоматический запрос при монтировании компонента
- ✅ Автоматическая обработка ошибок Axios
- ✅ Возможность повторного запроса через `refetch`
- ✅ TypeScript поддержка с дженериками
- ✅ Использует настроенный Axios instance из конфигурации

### Ограничения
- ⚠️ Поддерживает только GET запросы
- ⚠️ Для POST/PUT/DELETE используйте стандартные методы Axios
- ⚠️ При изменении URL запрос автоматически повторится

---

## 🔄 Комбинированное использование

Пример использования обоих хуков вместе:

```typescript
import { useState, useEffect } from "react";
import { useDebounce, useHttp } from "../../../hooks";

export const SmartSearch = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    
    // useHttp автоматически обновится при изменении debouncedQuery
    const { data, loading, error } = useHttp<ISearchResponse>(
        debouncedQuery ? `/account/search/${debouncedQuery}` : ''
    );

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
            />
            
            {loading && <Spinner />}
            {error && <ErrorMessage message={error} />}
            {data?.users.map(user => <UserCard key={user.id} user={user} />)}
        </div>
    );
};
```

---

## 📦 Интеграция в проект

### Где используются хуки

1. **SearchBar.tsx** - использует `useDebounce` для оптимизации поиска
   - Путь: `src/pages/protected/subscriptions/components/SearchBar.tsx`

2. **Subscriptions/index.tsx** - использует `useDebounce` для поиска пользователей
   - Путь: `src/pages/protected/subscriptions/index.tsx`

3. **PostsWithHttp.tsx** - пример компонента с `useHttp`
   - Путь: `src/pages/protected/home/components/PostsWithHttp.tsx`

4. **UserSearch.tsx** - пример поиска с `useHttp`
   - Путь: `src/pages/protected/subscriptions/components/UserSearch.tsx`

### Экспорт
Все хуки экспортируются из `src/hooks/index.ts`:

```typescript
export { useDebounce } from './useDebounce';
export { useHttp } from './useHttp';
```

### Импорт в компонентах
```typescript
import { useDebounce, useHttp } from "../../../hooks";
```

---

## 🚀 Best Practices

### useDebounce
1. **Оптимальная задержка**: 300-700ms для поиска, 500ms универсально
2. **Использование**: всегда для полей поиска и фильтрации
3. **Комбинация**: отлично работает с useEffect для API вызовов

### useHttp
1. **Типизация**: всегда указывайте тип ответа через дженерик
2. **Обработка ошибок**: всегда отображайте error state
3. **Повторные запросы**: используйте refetch для обновления данных
4. **Условная загрузка**: проверяйте query перед использованием в URL

---

## 💡 Когда использовать

### useDebounce
- ✅ Поиск в реальном времени
- ✅ Фильтрация больших списков
- ✅ Автосохранение форм
- ✅ Валидация полей ввода

### useHttp
- ✅ Загрузка данных при монтировании
- ✅ Простые GET запросы
- ✅ Отображение списков данных
- ✅ Профили пользователей

### Не использовать

#### useDebounce
- ❌ Для кнопок submit
- ❌ Для одиночных действий
- ❌ Для критичных по времени операций

#### useHttp
- ❌ Для POST/PUT/DELETE запросов
- ❌ Для сложной логики с несколькими запросами
- ❌ Когда нужен детальный контроль над запросом

---

## 📝 Примеры из проекта

### 1. Поиск пользователей (SearchBar)
```typescript
// Оптимизация поиска с задержкой 500ms
const debouncedQuery = useDebounce(query, 500);

useEffect(() => {
    onSearch(debouncedQuery);
}, [debouncedQuery]);
```

### 2. Загрузка постов (PostsWithHttp)
```typescript
const { data, loading, error, refetch } = useHttp<IPostsResponse>('/post');

if (loading) return <LoadingSpinner />;
if (error) return <ErrorComponent error={error} onRetry={refetch} />;
return <PostsList posts={data.posts} />;
```

---

## 🛠️ Технические детали

### useDebounce
- Использует `useEffect` для отложенного обновления
- Автоматическая очистка таймера при размонтировании
- TypeScript дженерик для типобезопасности

### useHttp
- Базируется на Axios instance из `config/Axios.ts`
- Автоматический запрос в `useEffect` при изменении URL
- `useCallback` для оптимизации функции `refetch`
- Обработка Axios и общих ошибок

---

## ⚙️ Конфигурация

### Настройка задержки debounce
```typescript
// По умолчанию 700ms
const debounced = useDebounce(value);

// Кастомная задержка
const debounced = useDebounce(value, 300); // 300ms
```

### Axios конфигурация
Hook использует глобальный Axios instance из `src/config/Axios.ts`

---

## 🔍 Тестирование

### Пример теста для useDebounce
```typescript
test('should debounce value updates', async () => {
    const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Еще не обновилось

    await waitFor(() => {
        expect(result.current).toBe('updated'); // Обновилось после задержки
    }, { timeout: 600 });
});
```

---

## 📚 Дополнительные ресурсы

- [React Hooks Documentation](https://react.dev/reference/react)
- [Axios Documentation](https://axios-http.com/)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

---

**Версия**: 1.0.0  
**Дата обновления**: 2025  
**Автор**: Social Network Team
