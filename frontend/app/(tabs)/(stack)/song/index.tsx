import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import SongCard from '@/components/song/card'
import Text from '@/components/ui/text'
import Background from '@/components/ui/background'
import { useRouter } from 'expo-router'
import Button from '@/components/ui/button'
import { checkBackstageRole } from '@/utils/check-user-role'

function Index() {
  const router = useRouter()
  const isUserBackstage = checkBackstageRole()

  return (
    <Background>

      {/* 🔼 Header */}
   <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
  <Text style={{ fontSize: 14, color: '#777' }}>รายการเพลงทั้งหมด</Text>

  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  }}>
    <MaterialIcons name="event" size={24} color="#4CAF50" />
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
        งานเปิดบ้าน
      </Text>
      <Text style={{ fontSize: 14, color: '#555' }}>
        01/12/24 | 01:00 - 05:00
      </Text>
    </View>
  </View>

  <View style={{ height: 1, backgroundColor: '#eee', marginTop: 12 }} />
</View>


      {/* 🎵 Song Queue */}
      <SongCard />

      {/* ➕ ปุ่มเพิ่มเพลง (เฉพาะ backstage) */}
      {
        isUserBackstage ? (
          <Button
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              borderRadius: 30,
              height: 60,
              width: 60,
              backgroundColor: '#4CAF50',
            }}
            onPress={() => router.navigate('/song/create')}
          >
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontSize: 36,
                color: 'white',
                lineHeight: 40,
                textAlign: 'center',
              }}>
                +
              </Text>
            </View>
          </Button>
        ) : null
      }

    </Background>
  )
}

export default Index
