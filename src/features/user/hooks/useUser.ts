import { useQuery } from '@tanstack/react-query';
import { usersQueryOptions } from '../api/user.query-options';

const useUser = () => {
  const getUsers = useQuery(usersQueryOptions());

  return {
    getUsers
  }
}

export default useUser;
