const Interviewees = () => {

    const interviewees = [
        {
            name: 'Rolando Garcia',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemCCPiHAjHaQsmQU2vFePX26OZLMBwKKQhg&usqp=CAU',
            job: 'Technical Manager',
            company: {
                img: 'https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png',
                name: 'ABC Corporation',
                abbreviation: 'ABC',
            },
            interviewer: {
                img: 'https://images.generated.photos/g4BupqSFtB7npSUzMQ1ClUQ1Zsy3qcr63o3S_U-hxTM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTI1NzMyLmpwZw.jpg',
                name: 'Gabbie Shelber',
                role: 'CEO',
            },
            date: '03/06/24 (12:00 PM)'
        },
        {
            name: 'Rolando Garcia',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemCCPiHAjHaQsmQU2vFePX26OZLMBwKKQhg&usqp=CAU',
            job: 'Technical Manager',
            company: {
                img: 'https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png',
                name: 'ABC Corporation',
                abbreviation: 'ABC',
            },
            interviewer: {
                img: 'https://images.generated.photos/g4BupqSFtB7npSUzMQ1ClUQ1Zsy3qcr63o3S_U-hxTM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTI1NzMyLmpwZw.jpg',
                name: 'Gabbie Shelber',
                role: 'CEO',
            },
            date: '03/06/24 (12:00 PM)'
        },
        {
            name: 'Rolando Garcia',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemCCPiHAjHaQsmQU2vFePX26OZLMBwKKQhg&usqp=CAU',
            job: 'Technical Manager',
            company: {
                img: 'https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png',
                name: 'ABC Corporation',
                abbreviation: 'ABC',
            },
            interviewer: {
                img: 'https://images.generated.photos/g4BupqSFtB7npSUzMQ1ClUQ1Zsy3qcr63o3S_U-hxTM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTI1NzMyLmpwZw.jpg',
                name: 'Gabbie Shelber',
                role: 'CEO',
            },
            date: '03/06/24 (12:00 PM)'
        },
        {
            name: 'Rolando Garcia',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemCCPiHAjHaQsmQU2vFePX26OZLMBwKKQhg&usqp=CAU',
            job: 'Technical Manager',
            company: {
                img: 'https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png',
                name: 'ABC Corporation',
                abbreviation: 'ABC',
            },
            interviewer: {
                img: 'https://images.generated.photos/g4BupqSFtB7npSUzMQ1ClUQ1Zsy3qcr63o3S_U-hxTM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTI1NzMyLmpwZw.jpg',
                name: 'Gabbie Shelber',
                role: 'CEO',
            },
            date: '03/06/24 (12:00 PM)'
        },
        {
            name: 'Rolando Garcia',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemCCPiHAjHaQsmQU2vFePX26OZLMBwKKQhg&usqp=CAU',
            job: 'Technical Manager',
            company: {
                img: 'https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png',
                name: 'ABC Corporation',
                abbreviation: 'ABC',
            },
            interviewer: {
                img: 'https://images.generated.photos/g4BupqSFtB7npSUzMQ1ClUQ1Zsy3qcr63o3S_U-hxTM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTI1NzMyLmpwZw.jpg',
                name: 'Gabbie Shelber',
                role: 'CEO',
            },
            date: '03/06/24 (12:00 PM)'
        },
    ]
    return (
        <>
            <h3 className="uppercase font-semibold text-gray-500 pb-3">Interviews</h3>
            <table className='w-full table-auto border-separate border-spacing-y-2 '>
                <thead className=''>
                    <tr className=''>
                        <th><p>Candidate</p></th>
                        <th><p>Company</p></th>
                        <th><p>Interviewer</p></th>
                        <th><p>Schedule Info</p></th>
                    </tr>
                </thead>
                <tbody className=''>
                    {interviewees.map((interviewee, index) => (
                        <tr className='bg-white shadow-sm ' key={index}>
                            <td className='text-left'>
                                <div className="flex gap-2 ">
                                    <div className='w-8 h-8'>
                                        <img src={interviewee.img} alt=""
                                            className='w-full h-full object-cover rounded-full' />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="font-bold">{interviewee.name}</p>
                                        <p className="text-gray-500">{interviewee.job}</p>
                                    </div>
                                </div>
                            </td>

                            <td className='text-left'>
                                <div className="flex gap-2 ">
                                    <div className='w-8 h-8'>
                                        <img src={interviewee.company.img} alt=""
                                            className='w-full h-full object-cover  rounded-full' />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="font-bold">{interviewee.company.name}</p>
                                        <p className="text-gray-500">{interviewee.company.abbreviation}</p>
                                    </div>
                                </div>
                            </td>

                            <td className='text-left'>
                                <div className="flex gap-2 ">
                                    <div className='w-8 h-8'>
                                        <img src={interviewee.interviewer.img} alt=""
                                            className='w-full h-full object-cover  rounded-full' />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="font-bold">{interviewee.interviewer.name}</p>
                                        <p className="text-gray-500">{interviewee.interviewer.role}</p>
                                    </div>
                                </div>
                            </td>
                            <td className='text-left'>
                                <div className="flex gap-2 ">
                                    <div className="flex flex-col justify-start">
                                        <p className="font-bold">{interviewee.job}</p>
                                        <p className="text-gray-500">{interviewee.date}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Interviewees