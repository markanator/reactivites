using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class Results<T>
    {
        public bool IsSuccess { get; set; }
        public T Data { get; set; }
        public string Error { get; set; }
        public static Results<T> Success(T data) => new Results<T>{ IsSuccess = true, Data = data };
        public static Results<T> Failure(string error) => new Results<T>{ IsSuccess = false, Error = error };
    }
}