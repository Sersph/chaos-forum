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
            <span>{props.postDescription.leaveWords || 0}</span>
          </section>
          <section className="post-base-info">
            <div className="title-and-create-username">

              <Typography
                noWrap
                className="post-title"
              >
                <Link
                  href={`/post?id=${props.postDescription.id}`}
                  as={`/post/${props.postDescription.id}`}
                >
                  <a href={`/post/${props.postDescription.id}`}>{props.postDescription.title}
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
              >{props.postDescription.updateTime}</Typography>
            </div>

            <div className="post-content-and-last-message-username-and-last-message-time">
              <Typography
                className="post-content"
                noWrap
              >{htmlUtil.parseHtmlStrToHtmlContent(props.postDescription.content)}</Typography>
              <Typography
                className="last-message-username"
                noWrap
              >{props.postDescription.creatorUsername}</Typography>
              <Typography
                className="last-message-time"
                noWrap
              >{props.postDescription.updateTime}</Typography>
            </div>

            <div className="post-category-name">
              <Typography
                className="category-name"
                noWrap
              >
                <Link
                  href={`/home?postCategoryId=${props.postDescription.articleCategoryId}`}
                  as={`/home?postCategoryId=${props.postDescription.articleCategoryId}`}
                >
                  <a href={`/home?postCategoryId=${props.postDescription.articleCategoryId}`}>
                    发布于 <span>{props.postDescription.articleCategoryName}</span>
                  </a>
                </Link>
              </Typography>
            </div>

            {props.postDescription.preview.length > 0 && (
              <section className="preview-image-list">
                {props.postDescription.preview.map((previewImageListItem: any, index: number) => (
                  <div key={index} className="img-container">
                    <ImageZoom
                      zoomMargin={50}
                      defaultStyles={{
                        zoomContainer: {
                          zIndex: 1202
                        }
                      }}
                      shouldReplaceImage={false}
                      zoomImage={{
                        src: previewImageListItem.original,
                        className: 'original-zoom'
                      }}
                      image={{
                        src: previewImageListItem.original
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
