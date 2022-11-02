import { useState } from 'react'

import { ReactComponent as PresentationIcon } from '../../assets/PresentationIcons/presentationIcon.svg'
import { ReactComponent as LivePresentation } from '../../assets/PresentationIcons/livePresentation.svg'
import { ReactComponent as DeletePresentation } from '../../assets/PresentationIcons/deletePresentation.svg'

interface IPresentationCardOProps {
  newId: string
  type: string
}

const PresentationCard = ({ newId, type }: IPresentationCardOProps) => {
  const [isPublic, setIsPublic] = useState(false)
  const [isLive, setIsLive] = useState(false)

  return (
    <div className="relative flex flex-col justify-between bg-grey-background w-72 rounded-1">
      <div className="absolute mt-4 right-4">
        <a className="hover:bg-blue-default cursor-pointer">
          <DeletePresentation
            strokeWidth={2}
            height={20}
            width={20}
            className="hover:text-danger hover:scale-125"
          />
        </a>
      </div>
      <div className="flex mt-4 ml-4 mb-8">
        <PresentationIcon className="mr-4" />
        <p>Application</p>
      </div>
      {type === 'uploaded' ? (
        <div className="flex border border-b-0 border-l-0 border-r-0 border-white p-4">
          <div className="flex-1 flex pr-10">
            <button className="mr-1" onClick={() => setIsLive(!isLive)}>
              <LivePresentation
                strokeWidth={2}
                height={25}
                width={25}
                className={
                  isLive
                    ? 'text-primary-default ml-1 scale-125'
                    : 'text-black  ml-1 hover:scale-125'
                }
              />
            </button>
            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-default">
              {isLive ? 'Live' : 'not live'}
            </span>
          </div>
          <div className="flex justify-between">
            <label
              htmlFor={'default-toggle' + newId}
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id={'default-toggle' + newId}
                className="sr-only peer"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <div className="w-11 h-6 bg-grey-default rounded-2 peer-focus:outline-none dark:peer-focus:ring-primary-default peer dark:bg-primary-default peer-checked:after:translate-x-full peer-checked:after:border-grey-default after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-default after:rounded-2 after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-default"></div>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-default">
                {isPublic ? 'Public' : 'Private'}
              </span>
            </label>
          </div>
        </div>
      ) : (
        <div className="relative pt-12 bg-white">
          <div className="absolute top-2">
            <div className="w-72 bg-gray-default h-1.5 mb-4 bg-grey-background rounded-1">
              <div
                className="bg-blue-default h-1.5 rounded-1 dark:bg-blue-default"
                style={{ width: '50%' }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PresentationCard
