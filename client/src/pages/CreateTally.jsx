import React from 'react';
import { useTitle } from '../hooks/useTitle';

const CreateTally = () => {
  useTitle('Generate Tally');

  const recruiter = [
    { name:'Aliana', c1:'0', c2:'2', c3:'3', c4:'0', total:'5' },
    { name:'Juan', c1:'0', c2:'2', c3:'3', c4:'1', total:'6' },
    { name:'Azi', c1:'5', c2:'2', c3:'0', c4:'0', total:'7' },
    { name:'Jana', c1:'1', c2:'2', c3:'3', c4:'0', total:'6' },
    { name:'Aris', c1:'5', c2:'2', c3:'3', c4:'0', total:'10' }
]

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className='text-2xl font-medium'>Generated Tally</h1>
      </div>

      <div>
        <p className="text-sm italic mb-9">Endorsements tally as of January 31, 2024</p>
      </div>

      <table className='w-full table-auto border-separate border-spacing-y-2'>
                <thead>
                    <tr>
                        <th>Recruiter</th>
                        <th>Company 1</th>
                        <th>Company 2</th>
                        <th>Company 3</th>
                        <th>Company 4</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className=''>
                        {recruiter.map((recruiter, index) => (
                            <tr className='bg-white shadow-sm' key={index}>
                                <td className=''>
                                    {/* <span className='inline-block w-2 h-2 bg-green-500 rounded-full'></span> */}
                                    <span className='ml-2 font-bold uppercase'>{recruiter.name}</span>
                                </td>
                                <td className=''>{recruiter.c1}</td>
                                <td className=''>{recruiter.c2}</td>
                                <td className=''>{recruiter.c3}</td>
                                <td className=''>{recruiter.c4}</td>
                                <td className='font-bold'>{recruiter.total}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
    </div>
  );
};

export default CreateTally;
