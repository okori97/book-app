import { app } from "./backend/src/app.js";

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`App is listening on ${PORT}`);
});
