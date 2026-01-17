# Quick Reference - Custom Hooks

## 🚀 useDebounce

**Цель**: Отложить обновление значения (для поиска, фильтрации)

```typescript
import { useDebounce } from "../../../hooks";

const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 500); // 500ms задержка

useEffect(() => {
    // API запрос выполнится только после 500ms бездействия
    searchAPI(debouncedQuery);
}, [debouncedQuery]);
```

## 🌐 useHttp

**Цель**: Упростить GET запросы с обработкой loading/error состояний

```typescript
import { useHttp } from "../../../hooks";

const { data, loading, error, refetch } = useHttp<ResponseType>('/api/endpoint');

if (loading) return <Spinner />;
if (error) return <Error message={error} />;
return <Content data={data} />;
```

## 🔥 Комбинированный пример

```typescript
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 500);
const { data, loading, error } = useHttp<Results>(
    debouncedSearch ? `/search/${debouncedSearch}` : ''
);
```

## 📍 Расположение файлов

```
src/
├── hooks/
│   ├── index.ts          # Экспорт всех хуков
│   ├── useDebounce.ts    # Debounce hook
│   ├── useHttp.ts        # HTTP hook
│   └── README.md         # Полная документация
```

## 💡 Когда использовать

| Hook | Используй для | Не используй для |
|------|---------------|------------------|
| `useDebounce` | Поиск, фильтрация, автосохранение | Кнопки submit, одиночные действия |
| `useHttp` | GET запросы, загрузка данных | POST/PUT/DELETE, сложная логика |

## 🎯 Примеры в проекте

- **SearchBar**: `src/pages/protected/subscriptions/components/SearchBar.tsx`
- **Subscriptions**: `src/pages/protected/subscriptions/index.tsx`
- **PostsWithHttp**: `src/pages/protected/home/components/PostsWithHttp.tsx`
- **UserSearch**: `src/pages/protected/subscriptions/components/UserSearch.tsx`
