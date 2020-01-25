/* 
    Listen to PORT 5000
*/
import server from "./server";

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
