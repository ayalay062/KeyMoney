
namespace DTO
{
    using System;
    using System.Collections.Generic;
    using DAL;

    public class UserConvertion
    {
        public static UserDto convertToDto(User user)
        {


            UserDto newUser = new UserDto();
            newUser.id_user = user.id_user;
            newUser.name_user = user.name_user;
            newUser.tel = user.tel;
            newUser.misgeret = user.misgeret;
            newUser.email = user.email;
            newUser.id_amuta = user.id_amuta;
            newUser.is_admin = user.is_admin;
            newUser.is_disabled = user.is_disabled;
            if (user.Amuta != null)
            {
                newUser.Amuta = AmutaConvertion.convertToDto( user.Amuta);
            }
            


            return newUser;
        }

        public static List<UserDto> convertToListDto(List<User> user)
        {

            List<UserDto> newUser = new List<UserDto>();
            user.ForEach(x =>
            {
                newUser.Add(convertToDto(x));
            });
            return newUser;
        }

        public static User convertToUser(UserDto user)
        {
            User newUser = new User();
            newUser.id_user = user.id_user;
            newUser.name_user = user.name_user;
            newUser.tel = user.tel;
            newUser.misgeret = user.misgeret;
            newUser.email = user.email;
            newUser.id_amuta = user.id_amuta;
            newUser.is_admin = user.is_admin;
            newUser.is_disabled = user.is_disabled;

            return newUser;

        }

    }

}
