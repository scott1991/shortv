import { useEffect, useState } from 'react';
import setting from './setting.js';

const { setting_host: host, setting_port: port } = setting;

const useFetchData = () => {
  const [lists, setLists] = useState({ following: [], forYou: [] });

  const fetchData = async (path, listKey) => {
    try {
      const response = await fetch(`http://${host}:${port}/${path}`);
      const data = await response.json();
      setLists(prevLists => ({
        ...prevLists,
        [listKey]: data.items
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData('following_list', 'following');
    fetchData('for_you_list', 'forYou');
  }, []);

  return lists;
}

export default useFetchData;
