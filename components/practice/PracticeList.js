import {FlatList} from 'react-native';
import React from 'react';
import PracticeItem from './PracticeItem';

const renderPracticeItem = itemData => {
  return <PracticeItem {...itemData.item} practice={itemData} />;
};

const PracticeList = ({practices}) => {
  return (
    <FlatList
      data={practices}
      renderItem={renderPracticeItem}
      keyExtractor={item => item.id}
      style={{flex: 1}}
      contentContainerStyle={{
        paddingBottom: 40,
        marginBottom: 10,
      }}
    />
  );
};

export default PracticeList;
