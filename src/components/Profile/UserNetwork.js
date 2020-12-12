/* eslint-disable import/no-extraneous-dependencies */
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';

import colors from '../../constants/colors';
import Card from './Card';
import CardButton from './CardButton';
import CardContent from './CardContent';
import CardContentWrapper from './CardContentWrapper';
import CardDetails from './CardDetails';
import CardIcon from './CardIcon';

const UserNetwork = ({ user, username, navigation, isButtonDisabled }) => (
  <Card>
    {/* Following */}
    <CardContentWrapper>
      <CardContent>
        <CardIcon>
          <Ionicons name="ios-heart-empty" size={18} color={colors.black} />
        </CardIcon>
        <CardDetails title="Following" count={user.following || ''} />
      </CardContent>

      {/* Followers */}
      <CardContent>
        <CardIcon>
          <SimpleLineIcons name="people" size={18} color={colors.black} />
        </CardIcon>
        <CardDetails title="Followers" count={user.followers || ''} />
      </CardContent>
    </CardContentWrapper>
    <CardButton
      title="Get Followers"
      color={colors.green}
      handleOnPress={() => {
        if (isButtonDisabled) return;
        navigation.navigate('Followers list', { username });
      }}
    />
  </Card>
);

export default UserNetwork;
