import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/ui/button';
import axios from '@/libs/axios';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const TransferAdminScreen = () => {
  const [users, setUsers] = useState<{ userId: string; fullName: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const router = useRouter();

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get<{ userId: string; fullName: string }[]>('/user/admin-transfer-list');
      const currentUserId = await SecureStore.getItemAsync('userId'); 
      const filteredUsers = response.data.filter((user) => user.userId !== currentUserId);
      setUsers(filteredUsers);
    } catch (err) {
      Alert.alert('Error', 'ไม่สามารถโหลดรายชื่อผู้ใช้ได้');
    }
  };
  fetchUsers();
}, []);

  const handleTransfer = () => {
    if (!selectedUserId) {
      Alert.alert('กรุณาเลือกผู้ใช้ที่ต้องการถ่ายโอน')   ;
      return;
    }

    Alert.alert('ยืนยันการโอนสิทธิ์', 'คุณต้องการโอนสิทธิ์ผู้ดูแลระบบให้ผู้ใช้นี้หรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ยืนยัน',
        onPress: async () => {
          try {
            await axios.patch('/admin/transfer', { newAdminId: selectedUserId });

            // ลบ role admin ออกจาก SecureStore
            const storedRoles = await SecureStore.getItemAsync('roles');
            if (storedRoles) {
              const parsedRoles = JSON.parse(storedRoles);
              const updatedRoles = parsedRoles.filter((role: string) => role !== 'admin');
              await SecureStore.setItemAsync('roles', JSON.stringify(updatedRoles));
            }

            Alert.alert('สำเร็จ', 'โอนสิทธิ์สำเร็จแล้ว');
            router.replace('/main-menu');
          } catch (error) {
            Alert.alert('ผิดพลาด', 'ไม่สามารถโอนสิทธิ์ได้');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เลือกสมาชิกที่จะรับสิทธิ์ System Admin</Text>
      <Picker
        selectedValue={selectedUserId}
        onValueChange={(itemValue) => setSelectedUserId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="-- กรุณาเลือกสมาชิก --" value="" />
        {users.map((user) => (
          <Picker.Item key={user.userId} label={user.fullName} value={user.userId} />
        ))}
      </Picker>

      <Button onPress={handleTransfer}>โอนสิทธิ์</Button>
    </View>
  );
};

export default TransferAdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: '#eee',
  },
});
