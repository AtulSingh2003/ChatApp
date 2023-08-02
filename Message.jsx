import React from 'react'
import { HStack,Avatar,Text} from '@chakra-ui/react'


const Message = ({text , user = "other" , uri}) => {
  return (
    <HStack alignSelf={user==="me"?"flex-end":"flex-start"} bg={"gray.100"} padding={"4"} paddingY={"2"} borderRadius={'base'}>
       
        {
            user==="other" && <Avatar src={uri}/>
        }
        <Text>{text}</Text>
        {
            user==="me" && <Avatar src={uri}/>
        }
    </HStack>
  )
}

export default Message