import React, { useState, useEffect } from 'react';
import { Modal, Card, Button, Paragraph, Portal, TextInput, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import ActivityEditorForm from '../input/ActivityEditorForm';

const ActivityEditorModal = ({ visible, editing, details, onConfirm, onDismiss, selectedActivityID }) => {

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
    activities: state.activities.item,
    selectedActivityID: state.activities.selectedActivityID
  }
};

export default connect(mapStateToProps)(ActivityEditorModal);
