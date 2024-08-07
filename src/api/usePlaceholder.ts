import { useQuery } from '@tanstack/react-query';

interface DataType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const jsonPlaceholder = async (limit: number): Promise<DataType[]> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`,
      {
        method: 'GET',
      }
    );

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const usePlaceholder = (limit: number = 5) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['테스트'],
    queryFn: () => jsonPlaceholder(limit),
  });

  return { data, isLoading, error };
};
