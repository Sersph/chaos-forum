import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';

// 当前组件类
const MyDocument = class _document extends Document {
  public render = (): JSX.Element => {
    return (
      <html lang="zh-CN">
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"/>
        <meta name="renderer" content="webkit"/>
        <meta name="force-rendering" content="webkit"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="theme-color" content="#eab105"/>

        <script
          dangerouslySetInnerHTML={{
            __html: `
                var userAgent = navigator.userAgent;
                var isIECore = userAgent.indexOf('Trident') > -1;
                var isIE11 = isIECore && userAgent.indexOf('rv:11.0') > -1;
                // 如果是 ie 内核, 并且版本小于 11, 提醒升级浏览器
                if (isIECore && !isIE11) {
                  alert('您当前的浏览器版本过低, 为了页面能正常的加载, 请升级浏览器!');
                }`
          }}
        />

        <script src="/static/library/tinymce/tinymce.min.js"></script>
        <script src="https://gosspublic.alicdn.com/aliyun-oss-sdk-6.0.0.min.js"></script>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  };
};

MyDocument.getInitialProps = async ctx => {
  // 解析顺序
  //
  // 服务端
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // 服务器出现错误
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // 客户端
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;
