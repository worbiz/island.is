import React from 'react'
import { Text } from '@island.is/island-ui/core'
import * as styles from './ApplicationsTable.treat'
import { useRouter } from 'next/router'

import cn from 'classnames'

import {
  TableHeaders,
  TableBody,
} from '@island.is/financial-aid-web/veita/src/components'
import { Application } from '@island.is/financial-aid/shared/lib'
import { TableHeadersProps } from '@island.is/financial-aid-web/veita/src/routes/ApplicationsOverview/applicationsOverview'

interface PageProps {
  applications: Application[]
  headers: TableHeadersProps[]
  className?: string
}

const ApplicationsTable = ({ applications, headers, className }: PageProps) => {
  const router = useRouter()

  if (applications && applications.length > 0) {
    return (
      <div className={`${styles.wrapper} hideScrollBar`}>
        <table
          className={cn({
            [`${styles.tableContainer}`]: true,
            [`${className}`]: true,
          })}
          key={router.pathname}
        >
          <thead>
            <tr>
              {headers.map((item, index) => (
                <TableHeaders
                  header={item}
                  index={index}
                  key={'tableHeaders-' + index}
                />
              ))}
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {applications.map((item: Application, index: number) => (
              <TableBody application={item} key={'tableBody-' + index} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return <Text>Engar umsóknir bíða þín, vel gert 👏</Text>
}

export default ApplicationsTable
