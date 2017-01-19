sysbench --test=cpu --cpu-max-prime=20000 run  > cpu_test_result.txt

sysbench --test=fileio --file-total-size=10G prepare
sysbench --test=fileio --file-total-size=10G --file-test-mode=rndrw --init-rng=on --max-time=100 --max-requests=0 run > file_test_result.txt
sysbench --test=fileio --file-total-size=10G cleanup

sysbench --test=oltp --oltp-table-size=100000 --mysql-db=test --mysql-user=root --mysql-password=yourrootsqlpassword prepare
sysbench --test=oltp --oltp-table-size=100000 --mysql-db=test --mysql-user=root --mysql-password=yourrootsqlpassword --max-time=60 --oltp-read-only=on --max-requests=0 --num-threads=8 run > mysql_test_result.txt
sysbench --test=oltp --mysql-db=test --mysql-user=root --mysql-password=yourrootsqlpassword cleanup
