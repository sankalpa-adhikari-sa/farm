import PocketBase from 'pocketbase';

const url='http://127.0.0.1:8090'
const pb= new PocketBase(url)
pb.autoCancellation(false);
export default pb