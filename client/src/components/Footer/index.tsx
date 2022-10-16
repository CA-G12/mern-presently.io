const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex lg:flex-row flex-col flex-wraps justify-between lg:mb-20 lg:mt-10 lg:mr-0 lg:ml-0 mr-4 ml-4">
        <div className="flex leading-6 lg:max-w-sm self-end">
          <p className="text-xsmall text-grey font-light">
            There are many variations of passages of Lorem the Ipsum available
            but it is the majority of suffered that a alteration in that some
            dummy text.There are many variations of passages of Lorem the Ipsum
            available but it is the majority of suffered that a alteration in
            that some dummy text.
          </p>
        </div>
        <div className="lg:flex-1 flex justify-around flex-wrap lg:mr-4 lg:ml-4 mt-12 lg:mb-0 mb-12 gap-1">
          <div className="lg:pl-2 pr-2 max-w-xs mr-2 flex-start">
            <p className="text-regular text-dark mb-4 text-blue-dark font-semibold">
              Service
            </p>
            <ul className="text-grey text-footer leading-6 font-light cursor-pointer hover:text-blue-dark">
              <li className="mb-2">
                <a>Incident Responder</a>
              </li>
              <li className="mb-2">
                <a className="cursor-pointer">Secure Managed IT</a>
              </li>
              <li className="mb-2">
                <a className="hover:text-black cursor-pointer">
                  Check website Url
                </a>
              </li>
              <li className="mb-2">
                <a>Locker Security</a>
              </li>
            </ul>
          </div>
          <div className="min-w-fit lg:pr-2 pl-2 max-w-xs ml-10 lg:m-0">
            <p className="text-regular text-dark mb-4 text-blue-dark font-semibold">
              About Us
            </p>
            <ul className="text-grey text-footer leading-6 font-light cursor-pointer hover:text-blue-dark">
              <li className="mb-2">
                <a>Payment Plans</a>
              </li>
              <li className="mb-2">
                <a>Make saving More</a>
              </li>
              <li className="mb-2">
                <a>Tax Calculator</a>
              </li>
              <li className="mb-2">
                <a>Talk To Us</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col max-w-xs">
            <p className="text-regular text-dark mb-4 text-blue-dark font-semibold">
              Follow Us
            </p>
            <div>icons</div>
          </div>
        </div>
      </div>
      <hr className="border-grey border-1 border-t-blue-dark" />
      <div className="mt-4 self-center text-xsmall text-grey-default font-light">
        © 2022 Saasmix All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer
