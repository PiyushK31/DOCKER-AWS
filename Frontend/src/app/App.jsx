/** 

import "./App.css"
import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"
import { useRef, useMemo, useState, useEffect } from "react"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"

function App() {

  const editorRef = useRef(null)
  const [ username, setUsername ] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || ""
  })
  const [ users, setUsers ] = useState([])

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ ydoc ])


  const handleMount = (editor) => {
    editorRef.current = editor

    new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([ editorRef.current ]),
    )
  }




  const handleJoin = (e) => {
    e.preventDefault()
    setUsername(e.target.username.value)
    window.history.pushState({}, "", "?username=" + e.target.username.value)



  }

  useEffect(() => {

    console.log(username)

    if (username) {

      const provider = new SocketIOProvider("/", "monaco", ydoc, {
        autoConnect: true,
      })

      provider.awareness.setLocalStateField("user", { username })


      const states = Array.from(provider.awareness.getStates().values())

      console.log(states)

      setUsers(states.filter(state => state.user && state.user.username).map(state => state.user))

      provider.awareness.on("change", () => {
        const states = Array.from(provider.awareness.getStates().values())
        setUsers(states.filter(state => state.user && state.user.username).map(state => state.user))
      })

      function handleBeforeUnload() {
        provider.awareness.setLocalStateField("user", null)
      }

      window.addEventListener("beforeunload", handleBeforeUnload)


      return () => {
        provider.disconnect()
        window.removeEventListener("beforeunload", handleBeforeUnload)
      }
    }
  }, [
    username
  ])

  if (!username) {
    return (
      <main className="h-screen w-full bg-gray-950 flex gap-4 p-4 items-center justify-center" >
        <form
          onSubmit={handleJoin}
          className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="p-2 rounded-lg bg-gray-800 text-white"
            name="username"
          />
          <button
            className="p-2 rounded-lg bg-amber-50 text-gray-950 font-bold"
          >
            Join
          </button>
        </form>
      </main>
    )
  }

  return (
    <main
      className="h-screen w-full bg-gray-950 flex gap-4 p-4"
    >
      <aside
        className="h-full w-1/4 bg-amber-50 rounded-lg "
      >
        <h2 className="text-2xl font-bold p-4 border-b border-gray-300">Users</h2>
        <ul className="p-4">
          {users.map((user, index) => (
            <li key={index} className="p-2 bg-gray-800 text-white rounded mb-2">
              {user.username}
            </li>
          ))}
        </ul>

      </aside>
      <section
        className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme="vs-dark"
          onMount={handleMount}
        />
      </section>

    </main>
  )
}

export default App

**/





import "./App.css"
import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"
import { useRef, useMemo, useState, useEffect } from "react"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"

function App() {

  const editorRef = useRef(null)
  const [ username, setUsername ] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || ""
  })
  const [ users, setUsers ] = useState([])

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ ydoc ])


  const handleMount = (editor) => {
    editorRef.current = editor

    new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([ editorRef.current ]),
    )
  }




  const handleJoin = (e) => {
    e.preventDefault()
    setUsername(e.target.username.value)
    window.history.pushState({}, "", "?username=" + e.target.username.value)



  }

  useEffect(() => {

    console.log(username)

    if (username) {

      const provider = new SocketIOProvider("/", "monaco", ydoc, {
        autoConnect: true,
      })

      provider.awareness.setLocalStateField("user", { username })


      const states = Array.from(provider.awareness.getStates().values())

      console.log(states)

      setUsers(states.filter(state => state.user && state.user.username).map(state => state.user))

      provider.awareness.on("change", () => {
        const states = Array.from(provider.awareness.getStates().values())
        setUsers(states.filter(state => state.user && state.user.username).map(state => state.user))
      })

      function handleBeforeUnload() {
        provider.awareness.setLocalStateField("user", null)
      }

      window.addEventListener("beforeunload", handleBeforeUnload)


      return () => {
        provider.disconnect()
        window.removeEventListener("beforeunload", handleBeforeUnload)
      }
    }
  }, [
    username
  ])

  if (!username) {
    return (
      <main className="min-h-screen w-full bg-[#0d1117] flex items-center justify-center">

        <form
          onSubmit={handleJoin}
          className="w-[380px] bg-[#161b22] border border-[#30363d] rounded-lg p-8 shadow-2xl"
        >

          <div className="mb-8">

            <div className="flex items-center gap-3 mb-3">

              <div className="w-9 h-9 rounded-md bg-[#007acc] flex items-center justify-center text-white font-bold">
                {"</>"}
              </div>

              <h1 className="text-xl font-semibold text-[#e6edf3]">
                Live Collaboration
              </h1>

            </div>

            <p className="text-sm text-[#8b949e]">
              Enter your username to join the workspace.
            </p>

          </div>


          <div className="mb-4">

            <label className="block text-xs text-[#8b949e] mb-2">
              USERNAME
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              className="w-full h-10 px-3 rounded-md bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#6e7681] outline-none focus:border-[#007acc]"
              name="username"
            />

          </div>


          <button
            className="w-full h-10 rounded-md bg-[#007acc] hover:bg-[#1177bb] text-white font-medium transition"
          >
            Join Workspace
          </button>

        </form>

      </main>
    )
  }

  return (
    <main className="h-screen w-full bg-[#181818] flex flex-col overflow-hidden">

      {/* Top Bar */}

      <header className="h-12 flex items-center justify-between px-4 bg-[#181818] border-b border-[#2d2d2d] text-[#cccccc]">

        <div className="flex items-center gap-3">

          <div className="w-7 h-7 rounded bg-[#007acc] flex items-center justify-center text-white text-xs font-bold">
            {"</>"}
          </div>

          <span className="text-sm font-medium">
            Live Collaboration
          </span>

        </div>


        <div className="flex items-center gap-2 text-xs text-[#858585]">

          <span className="w-2 h-2 rounded-full bg-[#4ec9b0]"></span>

          Connected

        </div>

      </header>


      {/* Workspace */}

      <div className="flex flex-1 min-h-0">


        {/* Activity Bar */}

        <aside className="w-12 bg-[#181818] border-r border-[#2d2d2d] flex flex-col items-center py-3 gap-5">

          <div className="text-[#cccccc] text-lg cursor-default">
            ◈
          </div>

          <div className="text-[#858585] text-lg cursor-default">
            ⌕
          </div>

          <div className="text-[#858585] text-lg cursor-default">
            ⑂
          </div>

        </aside>


        {/* Explorer */}

        <aside className="w-60 bg-[#181818] border-r border-[#2d2d2d] text-[#cccccc]">

          <div className="h-10 px-4 flex items-center text-xs font-medium uppercase tracking-wide border-b border-[#2d2d2d]">
            Explorer
          </div>


          <div className="px-3 py-3">

            <div className="flex items-center gap-2 px-2 py-2 text-xs text-[#cccccc] bg-[#2a2d2e] rounded-sm">

              <span className="text-[#858585]">
                ▾
              </span>

              <span>
                LIVE USERS
              </span>

            </div>


            <ul className="mt-2">

              {users.map((user, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[#cccccc] hover:bg-[#2a2d2e] rounded-sm"
                >

                  <span className="w-2 h-2 rounded-full bg-[#4ec9b0]"></span>

                  <span>
                    {user.username}
                  </span>

                </li>
              ))}

            </ul>

          </div>

        </aside>


        {/* Editor */}

        <section className="flex-1 min-w-0 bg-[#1e1e1e] overflow-hidden">


          {/* Editor Tab */}

          <div className="h-10 bg-[#181818] border-b border-[#2d2d2d] flex items-center">

            <div className="h-full px-4 flex items-center gap-2 bg-[#1e1e1e] border-t border-[#007acc] text-sm text-[#cccccc]">

              <span>
                Editor
              </span>

              <span className="text-[#858585] ml-2">
                ×
              </span>

            </div>

          </div>


          <div className="h-[calc(100%-40px)]">

            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// some comment"
              theme="vs-dark"
              onMount={handleMount}
            />

          </div>

        </section>

      </div>


      {/* Status Bar */}

      <footer className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs">

        <div className="flex items-center gap-4">

          <span>
            ● main
          </span>

          <span>
            ✓ Connected
          </span>

        </div>


        <div className="flex items-center gap-4">

          <span>
            UTF-8
          </span>

          <span>
            Spaces: 2
          </span>

        </div>

      </footer>

    </main>
  )
}

export default App
