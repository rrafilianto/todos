import React from 'react';
import { Grid, Segment, Placeholder } from 'semantic-ui-react';

const PlaceholderList = () => {
  return (
    <Grid columns={2} stackable>
      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default PlaceholderList;
