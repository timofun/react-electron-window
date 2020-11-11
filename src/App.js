import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { flattenArr, objToArr, timestampToString } from './utils/helper'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
const { remote, ipcRenderer } = window.require('electron')
function App() {
  const [ files, setFiles ] = useState(fileStore.get('files') || {})
  const [ activeFileID, setActiveFileID ] =useState('')
  const [ openedFileIDs, setOpenedFileIDs ] = useState([])
  const [ unsavedFileIDs, setUnsavedFileIDs ] = useState([])
  const [ searchedFiles, setSearchedFiles ] = useState([])
  const [ isLoading, setLoading ] = useState(false)
  const filesArr = objToArr(files)
  const savedLocation = settingsStore.get('savedFileLocation') || remote.app.getPath('documents')
  const activeFile = files[activeFileID]
  const fileSearch = (keyword) => {
    // filter out the new files based on the keyword
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 bg-danger left-panel">
          <FileSearch
            title='My Document'
            onFileSearch={fileSearch}
          />
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
        </div>
        <div className="col-9 bg-info right-panel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
