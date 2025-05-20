import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { Card } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { checkAdminRole } from '@/utils/check-user-role'

const Index = () => {
  const isAdmin = checkAdminRole()

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Card onPress={() => router.push('/event')} style={cardBaseStyle}>
        <Card.Content style={{ flexGrow: 1, flexShrink: 1, flexBasis: '100%' }}>
          <View style={cardContentWrapper}>
            <View style={[colorStrip, { backgroundColor: '#4CAF50' }]} />
            <View style={[badgeStyle, { backgroundColor: '#4CAF50' }]}>
              <Text style={badgeText}>+</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
              overflow: 'visible',
            }}>
              <MaterialIcons name="event" size={36} color="black" />
              <Text style={{ fontSize: 20, color: 'black' ,textAlign: 'center'}}>Event</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card onPress={() => router.push('/profile')} style={cardBaseStyle}>
        <Card.Content style={{ flexGrow: 1, flexShrink: 1, flexBasis: '100%' }}>
          <View style={cardContentWrapper}>
            <View style={[colorStrip, { backgroundColor: '#2196F3' }]} />
            <View style={[badgeStyle, { backgroundColor: '#2196F3' }]}>
              <Text style={badgeText}>+</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
              overflow: 'visible',
            }}>
              <MaterialIcons name="person" size={36} color="black" />
              <Text style={{ fontSize: 20, color: 'black' ,textAlign: 'center'}}>Profile</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {isAdmin && (
        <>
          <Card onPress={() => router.push('/')} style={cardBaseStyle}>
            <Card.Content style={{ flexGrow: 1, flexShrink: 1, flexBasis: '100%' }}>
              <View style={cardContentWrapper}>
                <View style={[colorStrip, { backgroundColor: '#FFC107' }]} />
                <View style={[badgeStyle, { backgroundColor: '#FFC107' }]}>
                  <Text style={badgeText}>+</Text>
                </View>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                  overflow: 'visible',
                }}>
                  <MaterialIcons name="person-add" size={36} color="black" />
                  <Text style={{ fontSize: 20, color: 'black' ,textAlign: 'center'}}>Activate new account</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card onPress={() => router.push('/deactivate-account')} style={cardBaseStyle}>
            <Card.Content style={{ flexGrow: 1, flexShrink: 1, flexBasis: '100%' }}>
              <View style={cardContentWrapper}>
                <View style={[colorStrip, { backgroundColor: '#E91E63' }]} />
                <View style={[badgeStyle, { backgroundColor: '#E91E63' }]}>
                  <Text style={badgeText}>+</Text>
                </View>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                  overflow: 'visible',
                }}>
                  <MaterialIcons name="verified-user" size={36} color="black" />
                  <Text style={{ fontSize: 20, color: 'black' ,textAlign: 'center'}}>Account Config</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card onPress={() => router.push('/transfer')} style={cardBaseStyle}>
            <Card.Content style={{ flexGrow: 1, flexShrink: 1, flexBasis: '100%' }}>
              <View style={cardContentWrapper}>
                <View style={[colorStrip, { backgroundColor: '#673AB7' }]} />
                <View style={[badgeStyle, { backgroundColor: '#673AB7' }]}>
                  <Text style={badgeText}>+</Text>
                </View>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                  overflow: 'visible',
                }}>
                  <MaterialIcons name="admin-panel-settings" size={36} color="black" />
                  <Text style={{ fontSize: 20, color: 'black' ,textAlign: 'center'}}>Transfer Admin</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </>
      )}

    </View>
  )
}


export default Index

const cardBaseStyle: StyleProp<ViewStyle> = {
  width: '48%',
  aspectRatio: 1.2,
  marginBottom: 16,
  borderRadius: 16,
  backgroundColor: 'white',
  elevation: 4,
}

const cardContentWrapper: StyleProp<ViewStyle> = {
  flex: 1,
  padding: 12,
  position: 'relative',
  backgroundColor: 'white',
}

const colorStrip: StyleProp<ViewStyle> = {
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  width: 6,
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
}

const badgeStyle: StyleProp<ViewStyle> = {
  position: 'absolute',
  zIndex: 3,
  top: 8,
  right: 8,
  borderRadius: 12,
  paddingHorizontal: 8,
  paddingVertical: 2,
}

const badgeText: StyleProp<TextStyle> = {
  color: 'white',
  fontSize: 12,
}






