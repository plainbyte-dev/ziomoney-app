import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { resetAddReceiverData } from '@/components/add-receiver/add-receiver-store';
import { AddReceiverOptionsSheet } from '@/components/choose-receiver/add-receiver-options-sheet';
import { ReceiverCard } from '@/components/choose-receiver/receiver-card';
import { receivers as initialReceivers, type Receiver } from '@/components/choose-receiver/receiver-data';
import { ReceiverOptionsSheet } from '@/components/choose-receiver/receiver-options-sheet';
import { ReceiverSearchBar } from '@/components/choose-receiver/receiver-search-bar';
import { sendFlowData } from '@/components/choose-receiver/send-flow-store';
import { GradientOutlineButton } from '@/components/gradient-outline-button';
import { SendMoneyHeader } from '@/components/send-money/send-money-header';
import { StatusDialog } from '@/components/status-dialog';

type ReceiverFlowStage = 'options' | 'confirmRemove' | 'removed';

export default function ChooseReceiverScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [addOptionsOpen, setAddOptionsOpen] = useState(false);
  const [receivers, setReceivers] = useState(initialReceivers);
  const [receiverFlow, setReceiverFlow] = useState<{ receiver: Receiver; stage: ReceiverFlowStage } | null>(null);

  const filteredReceivers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return receivers;
    return receivers.filter((receiver) => receiver.name.toLowerCase().includes(query));
  }, [search, receivers]);

  const handleAddManually = () => {
    setAddOptionsOpen(false);
    resetAddReceiverData();
    router.push('/add-receiver/receiving-country');
  };

  const handleSendMoney = () => {
    if (receiverFlow) {
      sendFlowData.receiver = receiverFlow.receiver;
    }
    setReceiverFlow(null);
    router.push('/send/additional-info');
  };

  const handleConfirmRemove = () => {
    if (!receiverFlow) return;
    setReceivers((prev) => prev.filter((receiver) => receiver.id !== receiverFlow.receiver.id));
    setReceiverFlow({ receiver: receiverFlow.receiver, stage: 'removed' });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top + 12 }}>
        <SendMoneyHeader title="Receiver" />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <GradientOutlineButton
          label="Add New Receiver"
          icon="person-add-outline"
          onPress={() => setAddOptionsOpen(true)}
        />

        <View style={styles.searchWrap}>
          <ReceiverSearchBar value={search} onChangeText={setSearch} />
        </View>

        <View style={styles.list}>
          {filteredReceivers.map((receiver) => (
            <ReceiverCard
              key={receiver.id}
              receiver={receiver}
              onPress={() => setReceiverFlow({ receiver, stage: 'options' })}
            />
          ))}
          {filteredReceivers.length === 0 && <Text style={styles.emptyText}>No receivers found.</Text>}
        </View>
      </ScrollView>

      <AddReceiverOptionsSheet
        visible={addOptionsOpen}
        onClose={() => setAddOptionsOpen(false)}
        onScan={() => setAddOptionsOpen(false)}
        onAddManually={handleAddManually}
      />

      <ReceiverOptionsSheet
        visible={receiverFlow?.stage === 'options'}
        onClose={() => setReceiverFlow(null)}
        onSendMoney={handleSendMoney}
        onRemove={() =>
          setReceiverFlow((prev) => (prev ? { receiver: prev.receiver, stage: 'confirmRemove' } : prev))
        }
      />

      <StatusDialog
        visible={receiverFlow?.stage === 'confirmRemove'}
        tone="warning"
        title="Remove Receiver?"
        message="Are you sure you want to remove this receiver?"
        buttonLabel="Ok"
        onButtonPress={handleConfirmRemove}
        onClose={() => setReceiverFlow(null)}
      />

      <StatusDialog
        visible={receiverFlow?.stage === 'removed'}
        tone="success"
        title="Removed!"
        message="The receiver has been removed successfully."
        buttonLabel="Confirm"
        onButtonPress={() => setReceiverFlow(null)}
        onClose={() => setReceiverFlow(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchWrap: {
    marginTop: 14,
  },
  list: {
    marginTop: 20,
    gap: 12,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 13.5,
    color: '#7A8894',
    marginTop: 20,
  },
});
