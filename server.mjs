import app from './index.mjs'

app.listen(process.env.PORT || 5122, function () { console.log('listening on *:5122'); });
