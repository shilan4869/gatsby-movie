import Layout from 'src/component/layout/Layout'
import { SEO as Seo } from 'src/component/seo/seo'

export const wrapPageElement = ({ element }) => (
  <Seo>
    <Layout>
      { element }
    </Layout>
  </Seo>
)


