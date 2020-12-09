/* eslint-disable import/no-extraneous-dependencies */
import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';

import colors from '../../constants/colors';
import { openUrl } from '../../util';
import Card from './Card';
import CardButton from './CardButton';
import CardContent from './CardContent';
import CardContentWrapper from './CardContentWrapper';
import CardDetails from './CardDetails';
import CardIcon from './CardIcon';

const ReposGists = ({ user }) => (
  <Card>
    <CardContentWrapper>
      {/* Repos */}
      <CardContent>
        <CardIcon>
          <SimpleLineIcons name="folder-alt" size={18} color={colors.black} />
        </CardIcon>
        <CardDetails title="Public Repos" count={user.public_repos} />
      </CardContent>

      {/* Gists */}
      <CardContent>
        <CardIcon rotateRight>
          <Feather name="bar-chart-2" size={18} color={colors.black} />
        </CardIcon>
        <CardDetails title="Public Gists" count={user.public_gists} />
      </CardContent>
    </CardContentWrapper>
    <CardButton
      title="GitHub Profile"
      color={colors.lightPurple}
      handleOnPress={() => {
        openUrl(`https://github.com/${user.login}`);
      }}
    />
  </Card>
);

export default ReposGists;
