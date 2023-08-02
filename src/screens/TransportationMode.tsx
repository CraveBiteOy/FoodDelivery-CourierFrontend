
import React, { useState } from 'react';
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AccordionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
};

const Accordion = ({ title, children, isOpen, toggleOpen }: AccordionProps) => {
  return (
    <>
      <TouchableOpacity onPress={toggleOpen} activeOpacity={0.6} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {children}
      </View>
    </>
  );
};



const TransportationMode = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    setIsOpen(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const toggleOpen = () => {
    setIsOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <View>
      <Accordion title="Select Transportation Mode" isOpen={isOpen} toggleOpen={toggleOpen}>
        <TouchableOpacity onPress={() => handleSelectMode('Bicycle')}>
          <Text style={[styles.option, selectedMode === 'Bicycle' ? styles.selectedOption : undefined]}>
            Bicycle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectMode('Car')}>
          <Text style={[styles.option, selectedMode === 'Car' ? styles.selectedOption : undefined]}>
            Car
          </Text>
        </TouchableOpacity>
      </Accordion>
      {selectedMode && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedHeader}>Selected:</Text>
          <Text style={styles.selectedText}>{selectedMode}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: '#f7691a',
    color: '#ffffff',
  },
  selectedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TransportationMode;
