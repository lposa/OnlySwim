import {useContext} from 'react';
import {PracticesContext} from '../../store/practices-context';
import PracticeList from '../practice/PracticeList';

const PastPractices = () => {
  const practicesCtx = useContext(PracticesContext);

  return <PracticeList practices={practicesCtx.practices} />;
};

export default PastPractices;
