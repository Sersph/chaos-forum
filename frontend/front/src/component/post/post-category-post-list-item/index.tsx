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
          <section className="user-base-info">
            <img
              src={(props.postDescription.userInfo.avatar !== undefined && props.postDescription.userInfo.avatar !== '') ? props.postDescription.userInfo.avatar : '../../static/image/person-default-avatar.jpg'}
              alt="user-avatar"
            />
            <Typography>{props.postDescription.userInfo.username}</Typography>
          </section>
          <section className="post-base-info">
            <Link href={`/post/detail?id=${props.postDescription.id}`} as={`/post/detail/${props.postDescription.id}`}>
              <a href={`/post/detail/${props.postDescription.id}`}>
                <Typography className="post-title">{props.postDescription.title}</Typography>
              </a>
            </Link>
            <div className="post-create-time-and-category">
              <Typography className="create-time">{props.postDescription.createTime}</Typography>
            </div>
            <Typography className="post-content" noWrap>{htmlUtil.parseHtmlStrToHtmlContent(props.postDescription.content)}</Typography>
            {props.postDescription.previewImageList.length > 0 && (
              <section className="preview-image-list">
                {props.postDescription.previewImageList.map((previewImageListItem, index) => (
                  <div key={index} className="img-container">
                    <ImageZoom
                      defaultStyles={{
                        zoomContainer: {
                          zIndex: 1202
                        }
                      }}
                      zoomMargin={50}
                      image={{
                        src: previewImageListItem.path
                      }}
                    />
                  </div>
                ))}
              </section>
            )}
          </section>
        </section>
        <section className="post-action-container">
          <section className="action-item like-action-item">
            <i/>
            <Typography className="action-text">{props.postDescription.messageCount}</Typography>
          </section>
          <section className="action-item message-action-item">
            <i/>
            <Typography className="action-text">{props.postDescription.messageCount}</Typography>
          </section>
        </section>
      </section>
    );
  };
}
