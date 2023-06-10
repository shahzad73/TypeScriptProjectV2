import React, { useContext, useState } from 'react';
import AppContext from '../../common/AppContext';
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from 'semantic-ui-react'
import { Grid, Image, Label, Segment } from 'semantic-ui-react'


export default function Items() {
  var isLoading = 1;

  const [data, dataSet] = useState(null);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false)

  React.useEffect((props) => {

      return () => {
        //alert("Bye");
      };
    
  }, []);



  async function Logout() {
    
    appContext.globalSetJwtToken( "" ); 
    navigate('/', { replace: true })

  };

  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ]

  

  return (  
    <div>
        {data}

        <br />
        {appContext.jwtToken}

        <br /><br />
        <Button  positive onClick={appContext.tickCounter}>Increase</Button>                
        <p>You clicked {appContext.count} times</p>  

        <br /><br />
        <Button color="pink" onClick={Logout}>Logout</Button>        

        <br /><br />
        <span>

        <Button.Group color='teal'>
    <Button>Save</Button>
    <Dropdown
      className='button icon'
      floating
      options={options}
      trigger={<></>}
    />
  </Button.Group>


  <Grid columns={2}>
    <Grid.Column>
      <Segment raised>
        <Label as='a' color='red' ribbon>
          Overview
        </Label>
        <span>Account Details</span>
        <br /><br />
        ewf wef wef <br />
        ewf wef wef <br />
        ewf wef wef <br />
        ewf wef wef <br /><br /><br />

        <Label as='a' color='blue' ribbon>
          Community
        </Label>
        <span>User Reviews</span>

        <Image src='/images/wireframe/paragraph.png' />
      </Segment>
    </Grid.Column>

    <Grid.Column>
      <Segment>
        <Label as='a' color='orange' ribbon='right'>
          Specs
        </Label>
        <Image src='/images/wireframe/paragraph.png' />

        <Label as='a' color='teal' ribbon='right'>
          Reviews
        </Label>
        <Image src='/images/wireframe/paragraph.png' />
      </Segment>
    </Grid.Column>
  </Grid>

  </span>

    </div>
  );
}
