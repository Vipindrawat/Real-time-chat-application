import io from 'socket.io-client'
const END = "http://localhost:5000";

const socket = io(END);

export default socket;