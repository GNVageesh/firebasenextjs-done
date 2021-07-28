import Head from 'next/head'
import Image from 'next/image'
import Auth from '../components/Auth'
import firebase from '../config/clientApp';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function Home() {

  const db = firebase.firestore();

  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("loading: ", loading, "|", "Current User: ", user)

  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {}
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => {
      console.log(doc.data())
    });
  }

  const addVoteDocument = async (vote) => {
    await db.collection("votes").doc(user.uid).set({ vote });
  }

  return (
    <div>
      <div>

        {loading && <h4>Loading...</h4>}
        {!user && <Auth />}
        {user && (
          <div
            style={{
              display: "flex",
              height: "100vh",
              textAlign: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >

            <button style={{ fontSize: 32 }} onClick={() => addVoteDocument("python")}>Python</button>
            <button style={{ fontSize: 32 }} onClick={() => addVoteDocument("java")}>Java</button>
            <button style={{ fontSize: 32 }} onClick={() => addVoteDocument("c/c++")} > C / C++</button>
            <button style={{ fontSize: 32 }} onClick={() => addVoteDocument("js")}>JavaScript</button>
            <div>
              Python lovers: {" "}
              {votes?.docs?.filter((doc) => doc.data().vote === "python").length}
              <br />
              Java lovers: {" "}
              {votes?.docs?.filter((doc) => doc.data().vote === "java").length}
              <br />
              C/C++ lovers: {" "}
              {votes?.docs?.filter((doc) => doc.data().vote === "c/c++").length}
              <br />
              JavaScript lovers: {" "}
              {votes?.docs?.filter((doc) => doc.data().vote === "js").length}
              <br />
              <h1>{user.displayName}</h1>
              <h1>{user.email}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
