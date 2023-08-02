import { useEffect, useRef, useState } from "react"
import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react"
import Message from "./Components/Message"
import { signOut, onAuthStateChanged, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "./firebase"
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore"

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

const logOutHandler = () => {
  signOut(auth);
}



function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      });

      divForScroll.current.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
      alert(error)
    }

  }

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsuscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsuscribeMessages = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((item) => {
        const id = item.id;
        return { id, ...item.data() }
      }))
    })

    return () => {
      unsuscribe();
      unsuscribeMessages();
    }

  }, [])

  return (
    <Box bg={"black"}>
      {
        user ? (<Container h={"100vh"} bg={"white"}>

          <VStack h="full" paddingY={"4"}>
            <Button onClick={logOutHandler} w={"full"} colorScheme={"red"}>Log Out</Button>

            <VStack h="full" w={"full"} padding={"1"} overflowY={"auto"} css={{"&::-webkit-scrollbar":
          {display:"none"}}}>

              {
                messages.map((item, index) => {
                  return <Message text={item.text} uri={item.uri} user={item.uid === user.uid ? "me" : "other"} key={index} />
                })
              }

              <div ref={divForScroll}></div>
            </VStack>


            <form style={{ width: "100%" }} onSubmit={submitHandler}>
              <HStack>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter the Message ... " />
                <Button type="submit" colorScheme="blue">Send</Button>
              </HStack>
            </form>
          </VStack>

        </Container>) :
          <VStack h="100vh" justifyContent={"center"} bg={"orange.300"}>
            <Button onClick={loginHandler}>Sign In With Google</Button>
          </VStack>
      }

    </Box>
  );
}

export default App;
