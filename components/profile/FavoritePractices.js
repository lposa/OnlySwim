import {View, Text} from 'react-native';
import {useContext} from 'react';
import PracticeList from '../practice/PracticeList';
import {PracticesContext} from '../../store/practices-context';

const FavoritePractices = () => {
  const practicesCtx = useContext(PracticesContext);

  return (
    <PracticeList
      practices={practicesCtx.practices.filter(practice => practice.favorite)}
    />
  );
};

export default FavoritePractices;
