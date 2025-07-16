import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const SAVE_INTERVAL_MS = 2000;

function Editor() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);
  const quillRef = useRef(null);
  const documentId = 'demo-document'; // Static ID for now — later make dynamic

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    // Connect to socket
   const s = io('http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket'], // optional but good for local
  auth: { token },
});

    setSocket(s);

    return () => s.disconnect();
  }, [navigate]);

  useEffect(() => {
    if (!socket || !quillRef.current) return;

    const quill = quillRef.current.getEditor();

    socket.once('load-document', document => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('get-document', documentId);

    const handler = delta => {
      quill.updateContents(delta);
    };

    socket.on('receive-changes', handler);

    const changeHandler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', changeHandler);

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      quill.off('text-change', changeHandler);
      socket.off('receive-changes', handler);
      clearInterval(interval);
    };
  }, [socket]);

  return (
    <div>
    <ReactQuill ref={quillRef} theme="snow" />

    </div>
  );
}

export default Editor;
