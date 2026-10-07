      <!-- Sidebar Menu -->
      <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          @if(Session::get('groupuser')=="USER")
              <li class="nav-header">DASHBOARD</li> 
              <li class="nav-item menu-open">
                  <a href="#" class="nav-link">
                      <i class="nav-icon fas fa-tachometer-alt"></i>
                      <p>
                          Dashboard
                          <i class="right fas fa-angle-left"></i>
                      </p>
                  </a>
                  <ul class="nav nav-treeview">
                      <li class="nav-item">
                          <a href="/" class="nav-link">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Dashboard v1</p>
                          </a>
                      </li>
                      <li class="nav-item">
                          <a href="/dashboard2" class="nav-link ">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Data Kunjngan Tahunan</p>
                          </a>
                      </li>
                      <li class="nav-item">
                          <a href="/kunjunganpasien" class="nav-link ">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Data Kunjngan Harian</p>
                          </a>
                      </li>
                  </ul>
              </li>

              <li class="nav-header">DATA RAWAT PASIEN</li>
              <li class="nav-item">
                  <a href="/kunjunganpasien" class="nav-link ">
                  <i class="nav-icon far fa-circle text-info"></i>
                      <p>Kunjungan Poli</p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/lospasien" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>LOS Pasien</p>
                  </a>
              </li>

              <li class="nav-header">MONITORING</li>
              <li class="nav-item">
                  <a href="/monitoringrme" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>RME Rawat Jalan</p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/costmonitoring" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Biaya Monitoring</p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/statustracking" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Status Tracking</p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/timeservice" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Waktu Layan</p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/lospasien" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>LOS Pasien</p>
                  </a>
              </li>

              <li class="nav-item">
                  <a href="/loguser" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Log User</p>
                  </a>
              </li>
              
              <li class="nav-header">PERSEDIAAN/INVENTORY</li>
              <li class="nav-item menu-open">
                  <a href="#" class="nav-link">
                      <i class="nav-icon fas fa-th"></i>
                      <p>
                          Persediaan
                          <i class="right fas fa-angle-left"></i>
                      </p>
                  </a>
                  <ul class="nav nav-treeview">
                      <li class="nav-item">
                          <a href="/itembarang" class="nav-link">
                              <i class="nav-icon far fa-circle text-info"></i>
                              <p>Item Barang</p>
                          </a>
                      </li>
                      <li class="nav-item">
                          <a href="/persediaan" class="nav-link ">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Laporan Persediaan</p>
                          </a>
                      </li>
                      <li class="nav-item">
                          <a href="/laporanpenerimaan" class="nav-link ">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Laporan Penerimaan</p>
                          </a>
                      </li>
                      <li class="nav-item">
                          <a href="/pemakaianobat" class="nav-link ">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Laporan Pemakaian Obat</p>
                          </a>
                      </li>
                      <li class="nav-item">
                          <a href="/distribusi" class="nav-link ">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Laporan Distribusi</p>
                          </a>
                      </li>
                      <!-- <li class="nav-item">
                          <a href="/permintaanlogistik" class="nav-link ">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Permintaan OBAT/BMHP/RUANGAN</p>
                          </a>
                      </li>  -->
                      <li class="nav-item">
                          <a href="/permintaanlist" class="nav-link ">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Permintaan OBAT/BMHP/RUANGAN</p>
                          </a>
                      </li> 
                  </ul>
              </li>
              <li class="nav-header">DATA REFERENSI</li>
              <li class="nav-item">
                  <a href="/dokter" class="nav-link">
                      <i class="nav-icon fas fa-th"></i>
                      <p>
                          Dokter
                          <!-- <span class="right badge badge-danger">Coming soon</span> -->
                      </p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/dokter" class="nav-link">
                      <i class="nav-icon fas fa-th"></i>
                      <p>
                          Data User
                          <!-- <span class="right badge badge-warning">Coming soon</span> -->
                      </p>
                  </a>
              </li>
              @endif

              @if(Session::get('groupuser')=="DOKTER")

              <li class="nav-header">DOKTER</li>
              <li class="nav-item">
                  <a href="/obatdpjp" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Pemakaian obat DPJP</p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/datarawatpasien" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Kunjungan Rawat Jalan</p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/pasienranap" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Kunjungan Rawat Inap</p>
                  </a>
              </li>
              <li class="nav-item">
                  <a href="/timeservice" class="nav-link ">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Waktu Layan</p>
                  </a>
              </li>
              @endif  

              <li class="nav-header">UTULITAS</li>
              
              <li class="nav-item">
                  <a href="/donwload" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>
                          Download
                          <!-- <span class="right badge badge-danger">Coming soon</span> -->
                      </p>
                  </a>
              </li> 

                 
          </ul>
      </nav>
      <!-- /.sidebar-menu -->
