import {KeyboardAvoidingView, StyleSheet, ScrollView} from 'react-native';
import {useContext, useState} from 'react';
import Header from '../components/UI/Header';
import PracticeForm from '../components/form/PracticeForm';
import {PracticesContext} from '../store/practices-context';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import {updatePractice} from '../util/httpRequests';

const EditPractice = ({navigation, route}) => {
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
      practicesCtx.updatePractice(editedPracticeId, practiceData);
      await updatePractice(editedPracticeId, practiceData);
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

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onCofirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Header>Edit your practice</Header>

      <ScrollView style={styles.container}>
        <PracticeForm
          onEdit={confirmHandler}
          defaultValues={selectedPractice}
          isEditing={isEditing}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
});

export default EditPractice;
