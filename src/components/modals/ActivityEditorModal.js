import React, { useState, useEffect } from 'react';
import { Modal, Card, Button, Paragraph, Portal, TextInput, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import ActivityEditorForm from '../input/ActivityEditorForm';

const ActivityEditorModal = ({ activities, selectedActivityIndex, visible, editing, onConfirm, onDismiss }) => {

  if (visible) {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss}>
          <ScrollView>
            <Card>
              <Card.Title title={editing ? "Editing an activity" : "Adding an activity"} />
              <Card.Content>
                <ActivityEditorForm
                  editMode={editing}
                  details={activities[selectedActivityIndex]}
                  onConfirm={onConfirm}
                  onHide={onDismiss}
                />
              </Card.Content>
            </Card>
          </ScrollView>
        </Modal>
      </Portal>
    );
  }
  return <></>;
};

const mapStateToProps = state => {
  return {
    activities: state.activities.items,
    selectedActivityIndex: state.activities.selectedActivityIndex
  }
};

export default connect(mapStateToProps)(ActivityEditorModal);
