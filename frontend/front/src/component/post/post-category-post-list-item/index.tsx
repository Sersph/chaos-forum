import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import ImageZoom from 'react-medium-image-zoom';
import htmlUtil from '../../../util/html';
import './index.less';

// 当前组件的类型声明
interface Props {
  postDescription: any;
}

interface State {
}

// 当前组件类
export default class HotPostListItem extends React.Component<Props, State> {
  public static defaultProps = {
    hideCategoryName: false
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="post-category-post-list-item-container">
        <section className="post-base-info-container">
          <section className="post-message-count">
            <span>{props.postDescription.messageCount || 59}</span>
          </section>
          <section className="post-base-info">
            <div className="title-and-create-username">

              <Typography
                noWrap
                className="post-title"
              >
                <Link
                  href={`/post/detail?id=${props.postDescription.id}`}
                  as={`/post/detail/${props.postDescription.id}`}
                >
                  <a href={`/post/detail/${props.postDescription.id}`}>{props.postDescription.title}
                  </a>
                </Link>
              </Typography>

              <Typography
                className="post-create-username"
                noWrap
              >{props.postDescription.creatorUsername}</Typography>

              <Typography
                className="last-message-time"
              />
              <Typography
                className="mobile-last-message-time"
                noWrap
              >{props.postDescription.lastMessageTime || '2分钟前'}</Typography>
            </div>

            <div className="post-content-and-last-message-username-and-last-message-time">
              <Typography
                className="post-content"
                noWrap
              >{htmlUtil.parseHtmlStrToHtmlContent(props.postDescription.content)}</Typography>
              <Typography
                className="last-message-username"
                noWrap
              >{props.postDescription.lastMessageUsername || '张三'}</Typography>
              <Typography
                className="last-message-time"
                noWrap
              >{props.postDescription.lastMessageTime || '2分钟前'}</Typography>
            </div>

            <div className="post-category-name">
              <Typography
                className="category-name"
                noWrap
              >
                <Link
                  href={`/home?categoryId=${props.postDescription.articleCategoryId}`}
                  as={`/home?categoryId=${props.postDescription.articleCategoryId}`}
                >
                  <a href={`/home?categoryId=${props.postDescription.articleCategoryId}`}>
                    发布于 <span>{props.postDescription.articleCategoryName}</span>
                  </a>
                </Link>
              </Typography>
            </div>

            {props.postDescription.preview.length > 0 && (
              <section className="preview-image-list">
                {props.postDescription.preview.map((previewImageListItem, index) => (
                  <div key={index} className="img-container">
                    <ImageZoom
                      zoomMargin={25}
                      defaultStyles={{
                        zoomContainer: {
                          zIndex: 1202
                        }
                      }}
                      shouldReplaceImage={false}
                      zoomImage={{
                        src: previewImageListItem.original
                      }}
                      image={{
                        src: previewImageListItem.thumbnail
                      }}
                    />
                  </div>
                ))}
              </section>
            )}
          </section>
        </section>
      </section>
    );
  };
}
