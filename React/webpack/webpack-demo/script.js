// The provided value "./dist" is not an absolute path!


module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        filename: './result.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
}