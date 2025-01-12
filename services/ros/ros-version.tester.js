import { isSemver } from '../test-validators.js'
import { createServiceTester } from '../tester.js'

export const t = await createServiceTester()

t.create('gets the package version of vision_msgs in active distro')
  .get('/humble/vision_msgs.json')
  .expectBadge({ label: 'ros | humble', message: isSemver })

t.create('gets the package version of vision_msgs in EOL distro')
  .get('/lunar/vision_msgs.json')
  .expectBadge({ label: 'ros | lunar', message: isSemver })

t.create('returns not found for invalid package')
  .get('/humble/this package does not exist - ros test.json')
  .expectBadge({
    label: 'ros',
    color: 'red',
    message: 'package not found: this package does not exist - ros test',
  })

t.create('returns error for invalid distro')
  .get('/xxxxxx/vision_msgs.json')
  .expectBadge({
    label: 'ros',
    color: 'red',
    message: 'distribution.yaml not found: xxxxxx@master',
  })
