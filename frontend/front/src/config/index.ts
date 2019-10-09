import dev from './dev.env';
import prod from './prod.env';

export default {
  API_ROOT: process.env.NODE_ENV === 'development'
    ? dev.API_ROOT
    : prod.API_ROOT,
  UPLOAD_API_ROOT: process.env.NODE_ENV === 'development'
    ? dev.UPLOAD_API_ROOT
    : prod.UPLOAD_API_ROOT,
  API_OSS_ROOT: process.env.NODE_ENV === 'development'
    ? dev.API_OSS_ROOT
    : prod.API_OSS_ROOT,
  MOCK_API_ROOT: process.env.NODE_ENV === 'development'
    ? dev.MOCK_API_ROOT
    : prod.MOCK_API_ROOT
};
