
namespace DTO
{
    using System;
    using System.Collections.Generic;
    using DAL;
    public class Amuta_depositsConvertion
    {
        public static Amuta_depositsDto convertToDto(Amuta_deposits amutaDep)
        {
            Amuta_depositsDto newAmutaDep = new Amuta_depositsDto();
            newAmutaDep.id_deposit = amutaDep.id_deposit;
            newAmutaDep.id_amuta = amutaDep.id_amuta;
            newAmutaDep.id_user = amutaDep.id_user;
            newAmutaDep.sum = amutaDep.sum;
            newAmutaDep.dateOfDeposit = amutaDep.dateOfDeposit;
           // newAmutaDep.Amuta = amutaDep.Amuta;
        //    newAmutaDep.User = amutaDep.User;
            return newAmutaDep;
        }

        public static List<Amuta_depositsDto> convertToListDto(List<Amuta_deposits> amutaDep)
        {

            List<Amuta_depositsDto> newAmutaDep = new List<Amuta_depositsDto>();
            amutaDep.ForEach(x =>
            {
                newAmutaDep.Add(convertToDto(x));
            });
            return newAmutaDep;
        }

        public static Amuta_deposits convertToAmuta_deposits(Amuta_depositsDto amutaDep)
        {
            Amuta_deposits newAmutaDep = new Amuta_deposits();
            newAmutaDep.id_deposit = amutaDep.id_deposit;
            newAmutaDep.id_amuta = amutaDep.id_amuta;
            newAmutaDep.id_user = amutaDep.id_user;
            newAmutaDep.sum = amutaDep.sum;
            newAmutaDep.dateOfDeposit = amutaDep.dateOfDeposit;
           // newAmutaDep.Amuta = amutaDep.Amuta;
           // newAmutaDep.User = amutaDep.User;
     
            return newAmutaDep;

        }

    }

    
}
