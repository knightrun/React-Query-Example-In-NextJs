export const peopleKey = {
  all: ['people'] as const,
  lists: () => [...peopleKey.all, 'list'] as const,
  list: (page: string) => [...peopleKey.lists(), page] as const,
  details: () => [...peopleKey.all, 'detail'] as const,
  detail: (id: string) => [...peopleKey.details(), id] as const
}