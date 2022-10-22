import {ScrollView, StyleSheet} from 'react-native';
import PracticeForm from '../components/form/PracticeForm';
import Header from '../components/UI/Header';
import {useContext, useState} from 'react';
import {PracticesContext} from '../store/practices-context';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import {storePractices} from '../util/httpRequests';

const AddPractice = ({route, navigation}) => {
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const practicesCtx = useContext(PracticesContext);

  const editedPracticeId = route.params?.practiceId;
  const isEditing = !!editedPracticeId; //!! converts value into boolean
  const selectedPractice = practicesCtx.practices.find(
    practice => practice.id === editedPracticeId,
  );

  const confirmHandler = async practiceData => {
    setIsSubmitting(true);
    try {
      const id = await storePractices(practiceData);

      practicesCtx.addPractice({...practiceData, id: id});
      navigation.goBack();
      setIsSubmitting(false);
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onCofirm={errorHandler} />;
  }

  return (
    <>
      <Header>Add your practice</Header>

      <ScrollView>
        <PracticeForm
          onSubmit={confirmHandler}
          defaultValues={selectedPractice}
          submitButtonLabel={isEditing ? 'Update' : 'Add'}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddPractice;
