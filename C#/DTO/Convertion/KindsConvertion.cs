
namespace DTO
{
    using System;
    using System.Collections.Generic;
    using DAL;
    public class KindsConvertion
    {
        public static KindsDto convertToDto(Kinds kinds)
        {
            KindsDto newKinds = new KindsDto();
            newKinds.id_kind = kinds.id_kind;
            newKinds.name_kind = kinds.name_kind;
            return newKinds;
        }

        public static List<KindsDto> convertToListDto(List<Kinds> kinds)
        {

            List<KindsDto> newKinds = new List<KindsDto>();
            kinds.ForEach(x =>
            {
                newKinds.Add(convertToDto(x));
            });
            return newKinds;
        }

        public static Kinds convertToKinds(KindsDto kinds)
        {
            Kinds newKinds = new Kinds();
            newKinds.id_kind = kinds.id_kind;
            newKinds.name_kind = kinds.name_kind;
            return newKinds;

        }

    }
}
